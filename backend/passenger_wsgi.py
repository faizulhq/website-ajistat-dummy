"""
passenger_wsgi.py — Entry point untuk cPanel Python App (Phusion Passenger)
cPanel akan otomatis mengaktifkan virtualenv, jadi tidak perlu set INTERP manual.
"""
import sys
import os

# Tambah path backend ke sys.path
sys.path.insert(0, os.path.dirname(__file__))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
