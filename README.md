# MagicEye Generator (魔眼生成器)

A web-based autostereogram (Magic Eye) generator built with React + TypeScript + Vite.

## Features

- **Classic SIRDS Algorithm**: Based on the Thimbleby, Inglis, Witten paper
- **Multiple Pattern Types**: Noise, dots, triangles
- **Depth Layer System**: Create complex 3D scenes with multiple layers
- **Custom Depth Maps**: Upload your own grayscale depth images
- **AI Texture Generation**: Generate unique patterns using Stable Diffusion (requires backend)
- **Tutorial Mode**: Learn how to view stereograms

## Quick Start

### Frontend Only

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

### With Backend (for AI textures)

1. Install Python dependencies:
```bash
cd backend
pip install fastapi uvicorn pillow numpy torch diffusers transformers
```

2. Start the backend:
```bash
cd backend
python main.py
```

3. Set the API base URL:
```bash
# Create .env.local file
echo "VITE_API_BASE=http://localhost:8000" > .env.local
```

4. Start the frontend:
```bash
npm run dev
```

## How to View Stereograms

1. Relax your eyes and look "through" the image
2. Focus on the two guide dots at the top
3. Let the dots "merge" into three dots
4. The hidden 3D image will appear!

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Python, FastAPI, Stable Diffusion 1.5
- **Algorithm**: SIRDS (Single Image Random Dot Stereogram)

## License

MIT
