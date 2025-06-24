# Gateway Trainer

A simple browser-based tool for experimenting with binaural beats and basic audio effects. Use the sliders to adjust the base frequency and the frequency offset between the left and right channels. Choose an effect to modulate the tones and save any interesting settings with the bookmark button.

Open `index.html` in a modern browser to run the trainer.

## Auto Deploy Script

The `auto_deploy.sh` script pulls the latest changes from the Git repository and serves the project using Python's built-in HTTP server on port 8000:

```bash
./auto_deploy.sh
```

The server will be available at [http://localhost:8000](http://localhost:8000).
