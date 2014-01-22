class TroutSlappingException(Exception):
    ''' This exception is raised when an internal api is called inappropriately. It's most likely invalid parameters. '''
    pass

class IpInfoDBException(Exception):
    '''This exception is called when there is an error calling the IpInfoDB API.'''
    pass
