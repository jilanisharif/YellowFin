/*
 * Copyright 2014 TimeTrade Systems Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 /**
 * Embeddable Lightbox / Iframe
 *
 * A centered, lightboxed iframe, with no library dependencies.
 *
 * @version 1.5
 */
(function() {
    var view = "view", viewP = view +"=", embed = "embed", embedParam = viewP+embed, htmlParam = viewP+"full", viewR = new RegExp('&?' +embedParam +'+');
    var d = document;
    var tt = {
    destroy: function (el) { if(el.parentNode){ el.parentNode.removeChild(el);}},
    hitch: function (obj, methodName) { return function() { obj[methodName].apply(obj, arguments); };},
    launchWorkflow: function(t){
        return this.launchWorkflowFromLink(t);
    },
    launchWorkflowFromUrl: function(url, attrs){
        var link = d.createElement('a');
        for(var i in attrs){
            link.setAttribute(i, attrs[i]);
        }
        link.href = url;
        var frame = this.createLb(link);
        if(frame === true){
            window.open(url);
            return;
        }
        frame.src = this.autoAppendEmbed(link.href);
    },
    launchWorkflowFromForm: function(event){
        var form = event.target
        var frame = this.createLb(form);
        this.embedInputs = embedInputs = [];
        var injectHiddenInputs = function(paramObj){
            for(var i in paramObj){
                var input =  d.createElement("input");
                embedInputs.push(input);
                var name = i, value = paramObj[i];
                input.setAttribute("type", "hidden");
                input.setAttribute("name", name);
                input.setAttribute("value", value);
                form.appendChild(input);
            }
        };
        if(form.method.toLowerCase() == "get"){
            var paramString = form.action.split("?")[1];
            var params = paramString.split("&");
            var paramObj = {};
            for(var i in params){
                var paramParts = params[i].split("=");
                var name = paramParts[0], value = paramParts[1];
                paramObj[name] = value;
            }
            injectHiddenInputs(paramObj);
        }
        if(frame === true){
            form.action.replace(viewR, "");
            form.target = "_blank";
            return true;
        }
        event.preventDefault();
        var viewObj = {};
        viewObj[view] = embed;
        injectHiddenInputs(viewObj);
        form.target = frame.name;
        form.submit();
        return false; //stop the submit
    },
    launchWorkflowFromLink: function(link){
        var frame = this.createLb(link);
        if(frame === true){
            link.href.replace(viewR, "");
            link.target = "_blank";
            return true;
        }
        frame.src = this.autoAppendEmbed(link.href);
        return false; //stop the link
    },
    createLb: function(t){
        var b = d.body, n = navigator;
        var w = parseInt(t.getAttribute("data-lightbox-width")) || 762;
        var h = parseInt(t.getAttribute("data-lightbox-height")) || 583;
        this.closeCb = t.getAttribute("data-onclose-callback") || null;
        var topMgn = 20, pad = 3, brdW = 1;
        var vpDetect = t.getAttribute("data-vp-height-detection") != "false" ? true : false;
        var loader_msg = t.getAttribute("data-lightbox-loading-message") || "";
        var isGteIE9 = function() { return XDomainRequest && window.performance; };
        var msIE = "Microsoft Internet Explorer";
        var isIE = n.appName == msIE;
        //This is the best we can possibly do to detect a touch device, that has one touch property, has a screen position of 0 (upper left) and has a resolution under 1500. 
        var isTouchDevice = function() { return ( ('ontouchstart' in window && window.screenX == 0) || window.navigator.msMaxTouchPoints ) && screen.width < 1500 ? true : false; };
        /* Under mobile launch new window (return true) */
        var isDesktop = !isTouchDevice();
        var vpel = d.compatMode === "CSS1Compat" ?  d.documentElement : b;
        var totalLbHght = h + topMgn + (pad * 2 ) + (brdW * 2);
        var isVpHeightGtH = vpel.clientHeight > totalLbHght && vpDetect ? true : false;
        if (isIE){
            var isLtIe9Mode = isGteIE9() && d.documentMode < 9 ? true : false; //We are IE9 or higher running in IE8 or less mode.
        }
        /* First I decide if I can do a lightbox or I have to launch new */
        if(!isDesktop || !isVpHeightGtH || isLtIe9Mode){
            return true; //here we just return true - we are letting the form or link just submit naturally (with view=embed stripped)
        }
        /* OK we launching a box */
        b.style.overflow = "hidden";    
        var styleMe = function(el, obj){for(var i in obj){el.style[i] = obj[i];}return el;};
        var u = { position: "fixed", width: "100%", height: "100%", backgroundColor: "#463E3F", left: "0", top: "0", zIndex: "2999", "-moz-opacity":0.5, opacity: ".50", filter: "alpha(opacity=50)" };
        var cr = { width: w + "px", height: h + "px", position: "fixed", zIndex: "300001", bottom: "0", left: "50%", top: topMgn + "px", margin: "0 0 0 -" + w  / 2 + "px", backgroundColor: "white", border: brdW + "px solid black", padding: pad + "px", "-moz-border-radius": "6px", "borderRadius": "6px", boxShadow: "0 3px 7px black", boxSizing: "content-box" };
        var i = { width: w + "px", height: h + "px", position: "relative", zIndex: "300002", border: "none" };
        var msgBox = { width: w + "px", height: h + "px", position: "fixed", zIndex: "300003", left: "50%", top: topMgn + "px", margin: "0 0 0 -" + w  / 2 + "px", display: "table-cell", verticalAlign: "middle", textAlign: "center" };
        var msgBoxInnards = { width: "350px", fontFamily: "'Helvetica Neue', Arial, sans-serif", "textAlign": "center", position: "relative", "top": "50%", margin: "0 auto 0 auto" };
        var cl = { position: "fixed", zIndex: "400000", left: "51%", top: "10px", marginLeft: (w /2)-20+"px", color: "white", fontSize: "19px", textAlign: "left", fontFamily: "times", textIndent: "5px", borderRadius: "50%", width: "20px", height: "20px", lineHeight: "19px", background: "black", color: "white", border: "2px solid white", boxShadow: "0 0 4px black", boxSizing: "content-box" };  
        if (isIE){
            cl.fontWeight = "bold";
            cl.fontSize = "20px";
            cl.textIndent = "4px";
        }
        var uEl = styleMe(d.createElement("div"), u);
        b.insertBefore(uEl, b.firstChild);
        var crEl = styleMe(d.createElement("div"), cr);
        crEl.id = "tt-lb-container";
        var frame = d.createElement("iframe");
        frame.frameBorder = "0";
        frame.scrolling = "no";
        frame.name = "tt-lb-frme"
        frame.id = "tt-lb-frme"
        frame.title = "Click to Schedule Workflow by TimeTrade"
        frame.allow = "geolocation";
        var iEl = styleMe(frame, i);
        if(iEl.attachEvent){
            iEl.attachEvent('onload', this.hitch(this, "destroyMsgEls") );
        } else {
            iEl.onload = this.hitch(this, "destroyMsgEls");
        }
        crEl.appendChild(iEl);
        var msgEl = styleMe(d.createElement("div"), msgBox);
        var msgIEl = styleMe(d.createElement("div"), msgBoxInnards);
        msgIEl.innerHTML = loader_msg;
        msgEl.appendChild(msgIEl);
        crEl.appendChild(msgEl);
        this.msgEls = [ msgEl ];
        b.appendChild(crEl);
        this.els = [ uEl, iEl, crEl ];
        /* now create x */
        if(!this.clse){
            var clse = d.createElement("a");
            clse.innerHTML = "&times;";
            clse.style.textDecoration = "none";
            clse.onclick = this.hitch(this, "destroyDialog");
            clse.href = "javascript: void(0)";
            b.appendChild(styleMe(clse, cl));
            this.els.push(clse);
            this.clse = clse;
        }
        d.onkeydown = this.hitch(this, "destroyOnKey");
        /* A little delay is added to let the DOM load the iframe, and then focus.
        .onload property is avoided on frame because it creates again the msgEl element */
        setTimeout(function() { frame.focus() }, 500);
        return iEl;
    },
    autoAppendEmbed: function(url){
        var autoAppendEmbed = (url.indexOf(embedParam) === -1 && url.indexOf(htmlParam) === -1) ? true : false; //no embed param already, and no html param? Default to auto appending.
        if(autoAppendEmbed) {
            var p = "?";
            if(url.indexOf(p) !== -1){
             p = "&";
            }
            url += p + embedParam;
        }
        return url;
    },
    destroyOnKey: function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            this.destroyDialog();
        }
    },
    destroyDialog: function(){
        d.onkeydown = null;
        for(var i in this.els){
            this.destroy(this.els[i]);
        }
        delete this.clse;
        if(this.embedInputs){
            for(var i in this.embedInputs){
                this.destroy(this.embedInputs[i]);
            }
        }
        d.body.style.overflow = "";
        if (typeof window[this.closeCb] === 'function') {
            window[this.closeCb]();
        }
    },
    destroyMsgEls: function(){
        for(var i in this.msgEls){
            this.destroy(this.msgEls[i]);
        }
    }
    }; //end tt
    //init
    window.tt = tt;
})();