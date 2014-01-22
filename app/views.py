from app.utils.IPInfoDB import IpInfoDBAPI
from app.utils.shortcuts import render_to_template


def home_page(request):
    return render_to_template("landing.html", context={}, request=request)
