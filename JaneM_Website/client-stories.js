// Stop hidden media when a reader closes a story's video.
document.querySelectorAll('.story-entry__reveal').forEach(details => {
  details.addEventListener('toggle', () => {
    if (!details.open) details.querySelector('video')?.pause();
  });
});
