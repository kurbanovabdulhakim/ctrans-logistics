"""
Multithreaded Development Server for FortisWay CTRANS Clone
"""
import http.server
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        sys.stderr.write("%s - - [%s] %s\n" %
                         (self.address_string(),
                          self.log_date_time_string(),
                          format % args))

if __name__ == '__main__':
    server = http.server.ThreadingHTTPServer(("", PORT), Handler)
    print(f"FortisWay CTRANS Clone running at: http://localhost:{PORT}")
    sys.stdout.flush()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
