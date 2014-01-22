from app.utils.IPInfoDB import IpInfoDBAPI
from app.utils.shortcuts import render_to_json


def get_user_city(request):
    render_data = IpInfoDBAPI(request).get_request_location()
    return render_to_json(render_data)
