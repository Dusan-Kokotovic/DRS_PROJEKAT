import random
import threading

from sha3 import keccak_256
from time import sleep
from engine.db.access.user_access import TransactionAccess
from multiprocessing import Queue


mining_time = 300
repo = TransactionAccess()


def __mine_transaction(q: Queue):
    transaction_data= q.get()

    sender = transaction_data["sender"]
    receiver = transaction_data["receiver"]
    amount_sent = transaction_data["amount"]
    random_int = random.randint(1, 10000)
    isValid = transaction_data['isValid']

    if isValid:
        sleep(mining_time)

    string = f'{sender}{receiver}{amount_sent}{random_int}'
    string = string.encode('utf-8')
    k = keccak_256()
    k.update(string)

    q.put(k.hexdigest())


def thread_spawner(transaction_data, q: Queue):
        q_ = Queue()
        q_.put(transaction_data)
        thread = threading.Thread(target=__mine_transaction, args=[q_], daemon=True)
        thread.start()
        thread.join()
        return q.put(q_.get())
