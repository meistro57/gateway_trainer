# Gateway Trainer

A simple browser-based tool for experimenting with binaural beats and basic audio effects.

> **Disclaimer:** Use headphones at a comfortable volume and take regular breaks. This app is for experimentation only.

## Features

- **Binaural Beat Generator**: Adjust the base frequency and offset between left and right channels using intuitive sliders.
- **Audio Effects**: Choose from several effects to modulate the tones:
  - **Sweep**: Smoothly modulates both channels across a user-defined range.
  - **Hover**: Applies a gentle opposing modulation to each channel.
  - **Wobble**: Adds a subtle, rapid back-and-forth to the tones.
  - **Mindfuck**: Dramatic, rapid modulation for experimental results.
  - **None**: Plain, unmodulated binaural tones.
- **Live Frequency Display**: See the current left and right channel frequencies in real time.
- **Volume Control**: Fine-tune output volume.
- **Monroe Institute Focus Levels**: Instantly set recommended frequencies for Focus 3, 10, 12, 15, 21, and 27 using a dropdown.
- **Effect Parameter Sliders**: Tune the speed, sweep range, and hover range for effects.
- **Bookmarking**: Save and recall favorite settings. Bookmarks are stored in your browser.
- **Audio Visualizer**: Real-time frequency visualizations for left and right channels.
- **Responsive UI**: Clean, browser-friendly interface.

## Getting Started

Open `index.html` in a modern browser to run the trainer. No installation required.

## Bookmarks

Click the **Bookmark** button to save your current settings. Bookmarks are stored in your browser. You can view them in the developer console with `getBookmarks()` and reapply one with `loadBookmark(index)`.


## Auto Deploy Script

The `auto_deploy.sh` script pulls the latest changes from the Git repository and serves the project using the [`serve`](https://www.npmjs.com/package/serve) package on port 8000. If the `serve` command is not available, the script will install it globally via `npm`:

```bash
./auto_deploy.sh
```

The server will be available at [http://localhost:8000](http://localhost:8000).

## License

MIT License. See [LICENSE](LICENSE) for details.
