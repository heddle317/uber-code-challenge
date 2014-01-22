import json
import urllib
import urllib2

from django.conf import settings

from app.utils.exceptions import IpInfoDBException


class IpInfoDBAPI(object):

    def __init__(self, request):
        self.api_key = settings.IPINFODB_API_KEY
        self.url = 'http://api.ipinfodb.com/v3/ip-city/'

        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            self.ip = x_forwarded_for.split(',')[0]
        else:
            self.ip = request.META.get('REMOTE_ADDR')

    def get_request_location(self):
        location = self._get_location_json()
        # Defaults to SF values if there is nothing for latitude or longitude because why not :)
        return {'lat': location.get('latitude', 37.7833),
                'lng': location.get('longitude', -122.4167)}

    def _get_location_json(self):
        args = {
            'key': self.api_key,
            'ip': self.ip,
            'format': 'json',
        }
        data = urllib.urlencode(args)
        req = urllib2.Request(self.url + '?' + data)
        response = urllib2.urlopen(req)
        try:
            data = response.read()
        except urllib2.HTTPError, e:
            raise IpInfoDBException(e.read())
        return json.loads(data);
