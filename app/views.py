from app.utils.IPInfoDB import IpInfoDBAPI
from app.utils.shortcuts import render_to_template


def home_page(request):
    render_context = IpInfoDBAPI(request).get_request_location()
    return render_to_template("landing.html", context=render_context, request=request)
