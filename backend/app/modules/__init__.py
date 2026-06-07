"""Modules package for modular monolith organization.

Each subpackage should re-export a module's public API (router, services,
and schemas) to make wiring from the application root simpler and more
discoverable.
"""

__all__ = ["contact", "telemetry"]
