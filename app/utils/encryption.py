import binascii
import random
import string

_DEFAULT_CIPHER = 'Blowfish'


def _get_default_key():
    # needed because for some reason, tests don't load settings correctly during init?
    from django.conf import settings
    return settings.SECRET_KEY[:32]


def encrypt(value, cipher_name=_DEFAULT_CIPHER, key=None):
    if not key:
        key = _get_default_key()

    (cipher, prefix) = load_cipher(cipher_name, key)
    padding = _get_padding(value, cipher)

    if padding > 0:
        value += "\0" + ''.join([random.choice(string.printable) for index in range(padding - 1)])

    value = prefix + binascii.b2a_hex(cipher.encrypt(value))

    return value


def decrypt(value, cipher_name=_DEFAULT_CIPHER, key=None):
    if not key:
        key = _get_default_key()
 
    (cipher, prefix) = load_cipher(cipher_name, key)

    return cipher.decrypt(binascii.a2b_hex(value[len(prefix):])).split('\0')[0]


def load_cipher(cipher_name=_DEFAULT_CIPHER, key=None):
    if not key:
        key = _get_default_key()
 
    imp = __import__('Crypto.Cipher', globals(), locals(), [cipher_name], -1)
    cipher = getattr(imp, cipher_name).new(key)
    prefix = '$%s$' % cipher_name
 
    return (cipher, prefix)


def generate_key():
    return "".join([random.choice(string.printable) for index in range(32)])
 
 
def _get_padding(value, cipher):
    mod = len(value) % cipher.block_size
    if mod > 0:
        return cipher.block_size - mod
    return 0
