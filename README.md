
# 🗺️ Azgaar Map Hosting Docker - Local CORS-Enabled Map Server

This project provides a simple Dockerized HTTP server that serves `.map` files for use with [Azgaar's Fantasy Map Generator](https://azgaar.github.io/Fantasy-Map-Generator/). It includes proper CORS headers to allow the generator to load map files from `localhost` or a private network setup.

## 📦 Features

- 🔁 Fully CORS-enabled for use in iframes and external requests
- 🗂️ Auto-serves any `.map` file from the `/maps` directory
- 🐳 Docker-based: consistent and reproducible environment
- 🔒 Local only by default (via `localhost`), but configurable for remote access
- 💻 Ideal for use with [Obsidian](https://obsidian.md), TTRPG worldbuilding, and offline map hosting

## 🚀 Usage

### 1. Clone the repository (or create your own)

```bash
git clone https://github.com/yourusername/azgaar-map-server.git
cd azgaar-map-server
````

### 2. Add Your Maps

Place your `.map` files inside the `maps/` folder. Example:

```
maps/
├── MiMapa.map
├── World_001.map
└── ContinentAlpha.map
```

### 3. Build and Run the Docker Container

```bash
docker build -t azgaar-map-server .
docker run -d -p 4040:4040 --name mapserver azgaar-map-server
```

This exposes your maps at:
`http://localhost:4040/maps/<filename>.map`

Example:
`http://localhost:4040/maps/MiMapa.map`

### 4. Embed in Azgaar's Map Generator

Use the following format to embed your map with `maplink`:

```html
<iframe 
  src="https://azgaar.github.io/Fantasy-Map-Generator/?maplink=http://localhost:4040/maps/MiMapa.map" 
  width="100%" 
  height="800">
</iframe>
```

### 5. Use in Obsidian

If you're using Obsidian with a plugin like [Obsidian Leaflet](https://github.com/leafletjs/Leaflet) or the iframe HTML plugin:

```markdown
<iframe 
  src="https://azgaar.github.io/Fantasy-Map-Generator/?maplink=http://localhost:4040/maps/MiMapa.map" 
  width="100%" 
  height="800">
</iframe>
```

> Note: Obsidian must be configured to allow embedded HTML or iframe rendering, depending on the plugin.

---

## 🔧 Advanced Configuration

You can customize the port or bind to your LAN IP:

```bash
docker run -d -p 8080:80 --name mapserver azgaar-map-server
```

Access your map using:
`http://<your-ip>:8080/maps/MiMapa.map`

Enable LAN access (example for Obsidian across devices).

---

## 🔍 Technical Details

The container uses:

* `nginx` lightweight web server
* CORS headers configured for `Access-Control-Allow-Origin: *`
* All files inside `/maps` are automatically served statically

---

## 📁 Directory Structure

```
.
├── Dockerfile
├── maps/
│   ├── MiMapa.map
│   └── ...
└── README.md
```

---

## 📦 Dockerfile Example

```Dockerfile
FROM nginx:alpine

COPY ./maps /usr/share/nginx/html/maps
COPY ./nginx.conf /etc/nginx/nginx.conf
```

And your `nginx.conf`:

```nginx
events {}
http {
    server {
        listen 80;
        location /maps/ {
            root /usr/share/nginx/html/;
            add_header Access-Control-Allow-Origin *;
        }
    }
}
```

---

## 🧪 Testing

After starting the container, you can test CORS manually:

```bash
curl -I http://localhost:4040/maps/MiMapa.map
```

You should see:

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
...
```

---

## ❓ FAQ

**Q: Can I access this from another device on my network?**
A: Yes, use your local IP (e.g., `http://192.168.1.100:4040/...`) instead of `localhost`.

**Q: Will it work with GitHub Pages or Obsidian?**
A: Yes, as long as the map is accessible with proper CORS headers and the app supports iframe embedding.

**Q: Can I use it with HTTPS?**
A: For local use, HTTPS is not required. For production, use a reverse proxy (e.g., Nginx + Let's Encrypt) to add SSL.

---

## 🤝 Contributing

Feel free to open issues or submit PRs for improvements or enhancements.

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

```

Let me know if you'd like this localized in Spanish or if you want a Docker Compose version too.
```
