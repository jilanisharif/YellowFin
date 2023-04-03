const floatingWidgets = document.createElement("div");
floatingWidgets.className = "floating-menu";

var floatingHomeButton,
  floatingCloseButton,
  additionFloatingButtons,
  liveChatButton,
  botButton,
  locationButton,
  callButton,
  callbackButton;

setTimeout(() => {
  floatingWidgets.innerHTML = `
  <div class="floating-menu-area" id="floating-menu-button">
    <div class="floating-menu-home-button">
      <img src="./images/chatbot.png" alt="Yellow.ai chat" />
    </div>
    <div class="floating-menu-close-button">
      <i class="fa-solid fa-xmark"></i>
    </div>
  </div>
  <div class="floating-menu-additional-buttons" id="floating-bot-button">
    <i class="fa-solid fa-robot"></i>
  </div>
  <div class="floating-menu-additional-buttons" id="floating-chat-button">
    <i class="fa-regular fa-message"></i>
  </div>
  <div class="floating-menu-additional-buttons" id="floating-call-button">
    <i class="fa-sharp fa-solid fa-phone-volume"></i>
  </div>
  <div
    class="floating-menu-additional-buttons"
    id="floating-location-button"
  >
    <i class="fa-solid fa-location-dot"></i>
  </div>
`;

  document.body.appendChild(floatingWidgets);

  floatingHomeButton = document.querySelector(".floating-menu-home-button");
  floatingCloseButton = document.querySelector(".floating-menu-close-button");
  additionFloatingButtons = document.querySelectorAll(
    ".floating-menu-additional-buttons"
  );

  liveChatButton = document.getElementById("floating-chat-button");
  botButton = document.getElementById("floating-bot-button");
  locationButton = document.getElementById("floating-location-button");
  callButton = document.getElementById("floating-call-button");
  callbackButton = document.getElementById("callback-button");

  floatingHomeButton.addEventListener("click", () => {
    floatingHomeButton.style.display = "none";
    floatingCloseButton.style.display = "flex";
    additionFloatingButtons.forEach((button) => {
      button.style.display = "flex";
    });
  });

  floatingCloseButton.addEventListener("click", () => {
    floatingCloseButton.style.display = "none";
    floatingHomeButton.style.display = "flex";
    additionFloatingButtons.forEach((button) => {
      button.style.display = "none";
    });
  });

  liveChatButton.addEventListener("click", () => {
    floatingCloseButton.style.display = "none";
    floatingHomeButton.style.display = "none";
    additionFloatingButtons.forEach((button) => {
      button.style.display = "none";
    });

    var ymIframe = document.getElementById("ymIframe");

    if (ymIframe) {
      ymIframe.contentWindow.postMessage({
        event_code: "ym-inbound-event",
        data: {
          event: {
            code: "live-agent-trigger",
          },
        },
      });
    }
  });

  botButton.addEventListener("click", () => {
    floatingCloseButton.style.display = "none";
    floatingHomeButton.style.display = "none";
    additionFloatingButtons.forEach((button) => {
      button.style.display = "none";
    });
    var ymPluginButton = document.getElementById("ymDivBar");
    ymPluginButton.click();
  });

  locationButton.addEventListener("click", () => {
    floatingCloseButton.style.display = "none";
    floatingHomeButton.style.display = "none";
    additionFloatingButtons.forEach((button) => {
      button.style.display = "none";
    });
    var ymIframe = document.getElementById("ymIframe");

    if (ymIframe) {
      ymIframe.contentWindow.postMessage(
        {
          event_code: "ym-inbound-event",
          data: {
            event: {
              code: "atm-branch-trigger",
            },
          },
        },
        "*"
      );
    }
  });

  callButton.addEventListener("click", () => {
    floatingCloseButton.style.display = "none";
    floatingHomeButton.style.display = "none";
    additionFloatingButtons.forEach((button) => {
      button.style.display = "none";
    });
    var ymIframe = document.getElementById("ymIframe");

    if (ymIframe) {
      ymIframe.contentWindow.postMessage(
        {
          event_code: "ym-inbound-event",
          data: {
            event: {
              code: "outboundcall-trigger",
            },
          },
        },
        "*"
      );
    }
  });

  callbackButton.addEventListener("click", () => {
    floatingCloseButton.style.display = "none";
    floatingHomeButton.style.display = "none";
    additionFloatingButtons.forEach((button) => {
      button.style.display = "none";
    });
    var ymIframe = document.getElementById("ymIframe");

    if (ymIframe) {
      ymIframe.contentWindow.postMessage(
        {
          event_code: "ym-inbound-event",
          data: {
            event: {
              code: "outboundcall-trigger",
            },
          },
        },
        "*"
      );
    }
  });
}, 1000);

setTimeout(() => {
  var ymIframe = document.getElementById("ymIframe");

  var closeButton =
    ymIframe.contentWindow.document.querySelector(".close-button");

  closeButton.addEventListener("click", () => {
    floatingCloseButton.style.display = "none";
    floatingHomeButton.style.display = "flex";
    additionFloatingButtons.forEach((button) => {
      button.style.display = "none";
    });
  });
}, 2000);
