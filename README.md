# Barcode Medication Scanner

A Flask-based web application that allows users to scan barcodes from images or webcam input to retrieve detailed medication information. Built during **DeerHacks 2025**, this project aims to promote affordable healthcare by helping users compare medications and discover cheaper alternatives.

## Features

-  Upload barcode images to extract medication info
-  Scan barcodes using live webcam (base64-encoded input)
-  Fetch detailed drug data using a local/internal API
-  External links to buy or compare medications online
-  Responsive, user-friendly UI

---

## Built With

- **[Flask](https://flask.palletsprojects.com/)** – Python web framework
- **[Pillow](https://python-pillow.org/)** – Image processing library
- **[pyzbar](https://github.com/NaturalHistoryMuseum/pyzbar)** – Barcode decoding
- **HTML + JavaScript** – Frontend interactivity
- **[Bootstrap](https://getbootstrap.com/)** – UI responsiveness and styling

---

## Inspiration

Rising over-the-counter (OTC) medication costs often prevent people from accessing essential healthcare. Inspired by price comparison tools, this project was born out of a need for transparency in drug pricing and accessibility. We aimed to build a solution that helps people find cheaper, quality alternatives easily and effectively.

---

## How It Works

1. **Upload an Image**: Users can upload a photo containing a medication barcode.
2. **Barcode Decoding**: The app uses `pyzbar` and `Pillow` to process the image and extract the barcode.
3. **API Lookup**: The decoded barcode is sent to a local/internal API to fetch associated drug information.
4. **Display Results**: The frontend displays the drug name, generic equivalents, price comparisons, and external purchase links.

---

## What We Learned

-  Implementing real-time barcode scanning
-  Navigating and integrating medication APIs/databases
-  Designing intuitive and accessible UIs
-  Understanding the connection between drug affordability and public health

---

## Challenges We Faced

- **Database Accuracy**: Ensuring reliability of OTC drug data
- **Barcode Recognition**: Handling inconsistent packaging formats
- **User Experience**: Simplifying the workflow for all users

Despite these challenges, we delivered a working MVP that can help bridge the gap in healthcare affordability by enabling informed medication choices.

---

## Future Improvements

- Integration with a public/global drug database (e.g., FDA NDC Directory)
- OCR support for text-based drug info in addition to barcodes
- Multilingual UI for global accessibility
- Progressive Web App (PWA) support for mobile usage

---

## Screenshots

![Screenshot 2025-06-12 at 4.31.50 PM.png](uploads/Screenshot%202025-06-12%20at%204.31.50%E2%80%AFPM.png)
![Screenshot 2025-06-12 at 4.32.19 PM.png](uploads/Screenshot%202025-06-12%20at%204.32.19%E2%80%AFPM.png)
![Screenshot 2025-06-12 at 4.32.31 PM.png](uploads/Screenshot%202025-06-12%20at%204.32.31%E2%80%AFPM.png)

---

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/barcode-medication-scanner.git
   cd barcode-medication-scanner

---
