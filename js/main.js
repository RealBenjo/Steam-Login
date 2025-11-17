// QR generator: creates a demo QR containing a short random token and injects it into #qr_img
function generateQR() {
  const img = document.getElementById('qr_img');
  if (!img) return;
  const id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : ('tok-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,8));
  const payload = 'demo-login:' + id;

  // Prefer the bundled QR library if available
  const lib = window.QRCode || window.qrcode || window.qrcode;
  if (lib && typeof lib.toDataURL === 'function') {
    // the library supports Promise style
    try {
      const maybePromise = lib.toDataURL(payload, { width: 165, margin: 1 });
      if (maybePromise && typeof maybePromise.then === 'function') {
        maybePromise.then(url => { img.src = url; img.dataset.payload = payload; }).catch(err => {
          console.error('QR generation failed (promise):', err);
        });
      } else {
        // some builds accept a callback
        lib.toDataURL(payload, { width: 165, margin: 1 }, function(err, url) {
          if (err) { console.error('QR generation failed (cb):', err); return; }
          img.src = url; img.dataset.payload = payload;
        });
      }
    } catch (e) {
      console.error('QR generation error', e);
    }
  }
}



// auto-refresh every 20s
document.addEventListener('DOMContentLoaded', function() {
  // start a timer that regenerates the QR every 20 seconds
  let qrTimer = null;
  function startQrTimer() {
    if (qrTimer) clearInterval(qrTimer);
    qrTimer = setInterval(generateQR, 20000);
  }

  // runs at start
  generateQR();
  startQrTimer();
});

const form = document.getElementById("create_account");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

function validateStep(container) {
  const elements = container.querySelectorAll('input, select, textarea');
  for (const el of elements) {
    if (!el.checkValidity()) {
      el.reportValidity();
      return false;
    }
  }
  return true;
}

function checkEmails(event) {
  if (event) event.preventDefault();

  if (!validateStep(step1)) return false;

  const email = document.getElementById("email").value.trim();
  const reenter_email = document.getElementById("reenter_email").value.trim();

  if (email !== reenter_email) {
    Swal.fire({
      title: 'Uh oh',
      text: 'the e-mails do NOT match, please enter correct e-mail!',
      icon: 'error',
      customClass: {
        popup: 'site-swal-popup',
        title: 'site-swal-title',
        content: 'site-swal-center',
        confirmButton: 'site-swal-confirm',
        actions: 'site-swal-actions',
        closeButton: 'site-swal-close'
      }, didOpen: () => {
        // actually center the content
        const contentEl = document.querySelector('.swal2-html-container, .swal2-content');
        if (contentEl) contentEl.classList.add('site-swal-center');
      }
    });
    return false;
  }

  Swal.fire({
    title: 'Almost there!',
    text: "everything is good here, now let's go to the next step! :)",
    icon: 'success',
    customClass: {
      popup: 'site-swal-popup',
      title: 'site-swal-title',
      content: 'site-swal-center',
      confirmButton: 'site-swal-confirm',
      actions: 'site-swal-actions',
      closeButton: 'site-swal-close'
    }, didOpen: () => {
      // actually center the content
      const contentEl = document.querySelector('.swal2-html-container, .swal2-content');
      if (contentEl) contentEl.classList.add('site-swal-center');
    }
  }).then(() => {
    step1.style.display = "none";
    step2.style.display = "block";
  });

  return false;
}

function checkPasswords(event) {
  if (event) event.preventDefault();

  if (!validateStep(step2)) return false;

  const password = document.getElementById("passwordc").value.trim();
  const reenter_password = document.getElementById("reenter_password").value.trim();

  if (password !== reenter_password) {
    Swal.fire({
      title: 'Uh oh',
      text: 'the passwords do NOT match, please enter correct passwords!',
      icon: 'error',
      customClass: {
        popup: 'site-swal-popup',
        title: 'site-swal-title',
        content: 'site-swal-center',
        confirmButton: 'site-swal-confirm',
        actions: 'site-swal-actions',
        closeButton: 'site-swal-close'
      }
      ,
      didOpen: () => {
        const contentEl = document.querySelector('.swal2-html-container, .swal2-content');
        if (contentEl) contentEl.classList.add('site-swal-center');
      }
    });
    return false;
  }

  Swal.fire({
    title: 'Account registered!',
    text: 'everything is good to go :)',
    icon: 'success',
    customClass: {
      popup: 'site-swal-popup',
      title: 'site-swal-title',
      content: 'site-swal-center',
      confirmButton: 'site-swal-confirm',
      actions: 'site-swal-actions',
      closeButton: 'site-swal-close'
    }
    ,
    didOpen: () => {
      const contentEl = document.querySelector('.swal2-html-container, .swal2-content');
      if (contentEl) contentEl.classList.add('site-swal-center');
    }
  }).then(() => {
    form.submit();
  });

  return false;
}

function signIn(event) {
  if (event) event.preventDefault();

  const form = document.getElementById("login_form");
  // Run the shared per-container validator so we get the same behavior
  // (reports the first invalid control and returns false).
  if (form && !validateStep(form)) {
    return false;
  }
  const realusername = "igralec";
  const realpassword = "Geslo123";

  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("passwordl").value.trim();

  if (username !== realusername) {
    Swal.fire({
      title: 'Uh oh',
      text: 'this username does NOT exist, please enter existing username!',
      icon: 'error',
      customClass: {
        popup: 'site-swal-popup',
        title: 'site-swal-title',
        content: 'site-swal-center',
        confirmButton: 'site-swal-confirm',
        actions: 'site-swal-actions',
        closeButton: 'site-swal-close'
      }, didOpen: () => {
        // center the content
        const contentEl = document.querySelector('.swal2-html-container, .swal2-content');
        if (contentEl) contentEl.classList.add('site-swal-center');
      }
    });
    return false;
  }
  if (password !== realpassword) {
    Swal.fire({
      title: 'Uh oh',
      text: 'this password is NOT correct, please enter correct password!',
      icon: 'error',
      customClass: {
        popup: 'site-swal-popup',
        title: 'site-swal-title',
        content: 'site-swal-center',
        confirmButton: 'site-swal-confirm',
        actions: 'site-swal-actions',
        closeButton: 'site-swal-close'
      }, didOpen: () => {
        // center the content
        const contentEl = document.querySelector('.swal2-html-container, .swal2-content');
        if (contentEl) contentEl.classList.add('site-swal-center');
      }
    });
    return false;
  }

  Swal.fire({
    title: 'Success!',
    text: "you have successfully signed in :)",
    icon: 'success',
    customClass: {
      popup: 'site-swal-popup',
      title: 'site-swal-title',
      content: 'site-swal-center',
      confirmButton: 'site-swal-confirm',
      actions: 'site-swal-actions',
      closeButton: 'site-swal-close'
    },
    didOpen: () => {
      // center the content (keeps behavior consistent with other alerts)
      const contentEl = document.querySelector('.swal2-html-container, .swal2-content');
      if (contentEl) contentEl.classList.add('site-swal-center');
    }
  }).then((result) => {
    form.submit();
  });

  return false;
}

function togglePassword1(checkbox) {
  const passwd1 = document.getElementById('passwordc');

  if (!passwd1) return;
  const newType = checkbox.checked ? 'text' : 'password';
  passwd1.type = newType;
}
function togglePassword2(checkbox) {
  const passwd2 = document.getElementById('reenter_password');

  if (!passwd2) return;
  const newType = checkbox.checked ? 'text' : 'password';
  passwd2.type = newType;
}

function showAgreement() {
  const ssa = document.getElementById('ssa_body');

  if (!ssa) return;

  const content = ssa.innerHTML; // gets the whole agreement content
  Swal.fire({
    title: 'Steam Subscriber Agreement',
    html: content,
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: 'Close',
    customClass: {
      popup: 'site-swal-ssa-popup',
      title: 'site-swal-title',
      content: 'site-swal-content',
      confirmButton: 'site-swal-confirm',
      actions: 'site-swal-actions',
      closeButton: 'site-swal-close'
    }, didOpen: () => {
      const container = document.querySelector('.swal2-html-container'); // gets the content container (swal bs)

      // scroll the modal content, not the page
      const anchorClickHandler = (event) => {
        const a = event.target.closest('a');
        if (!a) return;
        const href = a.getAttribute('href');

        if (!href || !href.startsWith('#')) return;
        event.preventDefault();

        const name = href.slice(1);

        // look for id or name inside the modal content
        const target = container.querySelector('#' + CSS.escape(name)) || container.querySelector('[name="' + name + '"]');
        if (!target) return;

        // calculate position relative to container and scroll smoothly
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const offset = targetRect.top - containerRect.top + container.scrollTop - 8; // small padding
        container.scrollTo({ top: offset, behavior: 'smooth' });

        // update URL hash without scrolling the page
        try { history.replaceState(null, '', '#' + name); } catch (e) {}
      };

      // store handler so we can remove it on close
      container.__swalAnchorHandler = anchorClickHandler;
      container.addEventListener('click', anchorClickHandler);
    },
    willClose: () => {
      const container = document.querySelector('.swal2-html-container');
      if (container && container.__swalAnchorHandler) {
        container.removeEventListener('click', container.__swalAnchorHandler);
        delete container.__swalAnchorHandler;
      }
    }
  });
}

function showCreateAccount(){
  const register_main = document.getElementById('register_main');
  const login_main = document.getElementById('login_main');
  const ca_footer = document.getElementById('ca_footer');
  const title = document.getElementById('title');

  if (register_main && login_main) {
    title.innerText = "Create Your Account";
    login_main.style.display = 'none';
    ca_footer.style.display = 'none';
    register_main.style.display = 'block';
  }
}

function showSignIn(){
  const register_main = document.getElementById('register_main');
  const login_main = document.getElementById('login_main');
  const ca_footer = document.getElementById('ca_footer');
  const title = document.getElementById('title');

  if (register_main && login_main) {
    title.innerText = "Sign in";
    register_main.style.display = 'none';
    ca_footer.style.display = 'block';
    login_main.style.display = 'block';
  }
}

function showCredits(){
  Swal.fire({
    title: 'Credits',
    text: 'This site is made by Benjamin Ipavec',
    icon: 'info',
    customClass: {
      popup: 'site-swal-popup',
      title: 'site-swal-title',
      content: 'site-swal-center',
      confirmButton: 'site-swal-confirm',
      actions: 'site-swal-actions',
      closeButton: 'site-swal-close'
    }, didOpen: () => {
      // actually center the content
      const contentEl = document.querySelector('.swal2-html-container, .swal2-content');
      if (contentEl) contentEl.classList.add('site-swal-center');
    }
  });
}