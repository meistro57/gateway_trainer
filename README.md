# Gateway Trainer

A simple browser-based tool for experimenting with binaural beats and basic audio effects. Use the sliders to adjust the base frequency and the frequency offset between the left and right channels. Choose an effect to modulate the tones and save any interesting settings with the bookmark button. The interface now displays the current left and right frequencies and includes a volume slider for finer control. A dropdown of Monroe Institute "Focus" levels can automatically set recommended frequencies. Additional sliders let you tune the range of the **Sweep** and **Hover** effects.

Open `index.html` in a modern browser to run the trainer.

## Auto Deploy Script

The `auto_deploy.sh` script pulls the latest changes from the Git repository and
serves the project using the [`serve`](https://www.npmjs.com/package/serve)
package on port 8000. If the `serve` command is not available, the script will
install it globally via `npm`:

```bash
./auto_deploy.sh
```

The server will be available at [http://localhost:8000](http://localhost:8000).
