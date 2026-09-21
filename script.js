// Mobile menu
const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
}
// Profile photo: tries several file names, shows initials "MI" if none is found
document.querySelectorAll('.avatar img').forEach(img => {
  const options = ['images/profile.jpg','images/profile.jpeg','images/profile.png','images/profile.webp','images/profile.JPG','images/profile.PNG'];
  let i = 0;
  img.addEventListener('error', () => {
    i++;
    if (i < options.length) { img.src = options[i]; } else { img.remove(); }
  });
  img.src = options[0];
});
// Footer year
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
// Contact form (Formspree). Replace YOUR_FORM_ID in contact.html first.
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const note = document.getElementById('form-note');
    if (form.action.includes('YOUR_FORM_ID')) {
      note.textContent = 'The form is not connected yet. Please email me directly instead.';
      return;
    }
    note.textContent = 'Sending...';
    try {
      const res = await fetch(form.action, {method:'POST', body:new FormData(form), headers:{Accept:'application/json'}});
      if (res.ok) { note.textContent = 'Message sent. Thank you, I will reply soon.'; form.reset(); }
      else { note.textContent = 'Could not send the message. Please email me directly.'; }
    } catch { note.textContent = 'Network error. Please email me directly.'; }
  });
}
