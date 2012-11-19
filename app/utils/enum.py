import copy
import new

def enum(**enums):
    # NB: cheating here by just maintaining a copy of the original dict for iteration because iterators are hard
    #  it must be a deepcopy because new.classobj() modifies the original
    en = copy.deepcopy(enums)
    e = new.classobj('Enum', (), enums)
    e._dict = en
    e.choices = [(v, k) for k, v in en.iteritems()]  # return a list of 2-tuples to be used as an argument to Django Field.choices
    e.get_id_by_label = e._dict.get
    e.get_label_by_id = dict([(v, k) for (k, v) in e._dict.items()]).get

    return e
