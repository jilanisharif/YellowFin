const floatingWidgets = document.createElement("div");
floatingWidgets.className = "floating-menu";
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

var floatingHomeButton = document.querySelector(".floating-menu-home-button");
var floatingCloseButton = document.querySelector(".floating-menu-close-button");
var additionFloatingButtons = document.querySelectorAll(
  ".floating-menu-additional-buttons"
);

var liveChatButton = document.getElementById("floating-chat-button");
var botButton = document.getElementById("floating-bot-button");
var locationButton = document.getElementById("floating-location-button");
var callButton = document.getElementById("floating-call-button");
var callbackButton = document.getElementById("callback-button");
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
}, 3000);

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
  var ymIframe = document.getElementById("ymIframe");

  if (ymIframe) {
    ymIframe.contentWindow.postMessage(
      {
        event_code: "ym-inbound-event",
        data: {
          event: {
            code: "chatbot-trigger",
          },
        },
      },
      "*"
    );
  }
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
