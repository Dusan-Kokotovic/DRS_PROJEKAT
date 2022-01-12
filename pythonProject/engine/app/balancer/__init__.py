from .load_balancer import LoadBalancer
from .worker import Worker
from multiprocessing import Queue


task_queue = Queue()
balancer = LoadBalancer(task_queue)

