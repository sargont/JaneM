"""Build public catalogue derivatives with face-only, feathered blur masks.

Run with the temporary OpenCV environment created for this task. Source pages are
never modified; only JaneM_Website/assets/catalogue-pages is written.
"""
from pathlib import Path
import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "private-assets/restricted-catalogue/catalogue-pages"
OUTPUT = ROOT / "JaneM_Website/assets/catalogue-pages"
CASCADE = cv2.CascadeClassifier(str(Path(cv2.data.haarcascades) / "haarcascade_frontalface_default.xml"))

# Review fallback for clear profile/partially-occluded faces missed by the strict detector.
# These are tight face/head boxes, not garment or body masks.
MANUAL_FACES = {
    "page-01.jpg": [(45, 70, 130, 150), (285, 70, 130, 150), (530, 70, 130, 150)],
    "page-05.jpg": [(340, 180, 110, 150)], "page-07.jpg": [(340, 135, 110, 150)],
    "page-15.jpg": [(365, 260, 110, 140)], "page-17.jpg": [(290, 240, 110, 140)],
    "page-19.jpg": [(360, 330, 80, 90)], "page-21.jpg": [(360, 320, 110, 130), (245, 405, 45, 55)],
    "page-24.jpg": [(340, 125, 110, 140)], "page-27.jpg": [(300, 190, 110, 130), (380, 210, 120, 140)]
}

def unique_faces(faces):
    kept = []
    for face in sorted(faces, key=lambda item: item[2] * item[3], reverse=True):
        x, y, width, height = face
        if not any(abs(x - xx) < max(width, ww) * .45 and abs(y - yy) < max(height, hh) * .45 for xx, yy, ww, hh in kept):
            kept.append(face)
    return kept

def detect(image):
    grey = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    candidates = list(CASCADE.detectMultiScale(grey, scaleFactor=1.08, minNeighbors=7, minSize=(30, 30)))
    return unique_faces(candidates)

def blur_faces(image, faces):
    result = image.copy()
    softened = cv2.GaussianBlur(image, (0, 0), 18)
    for x, y, width, height in faces:
        centre = (x + width // 2, y + height // 2)
        # Keep the privacy mask confined to the recognised face. Earlier
        # padding spread into nearby catalogue headings and garment details.
        axes = (max(1, int(width * .48)), max(1, int(height * .5)))
        mask = np.zeros(image.shape[:2], dtype=np.uint8)
        cv2.ellipse(mask, centre, axes, 0, 0, 360, 255, -1)
        mask = cv2.GaussianBlur(mask, (0, 0), 4)
        alpha = (mask.astype(np.float32) / 255)[:, :, None]
        result = (softened * alpha + result * (1 - alpha)).astype(np.uint8)
    return result

OUTPUT.mkdir(parents=True, exist_ok=True)
total = 0
for source in sorted(SOURCE.glob("page-*.jpg")):
    image = cv2.imread(str(source))
    faces = unique_faces(detect(image) + MANUAL_FACES.get(source.name, []))
    output = blur_faces(image, faces)
    cv2.imwrite(str(OUTPUT / source.name), output, [cv2.IMWRITE_JPEG_QUALITY, 92])
    total += len(faces)
    print(f"{source.name}: {len(faces)} face(s)")
print(f"Built 49 derivatives with {total} detected face(s).")
