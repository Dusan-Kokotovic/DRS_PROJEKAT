from multiprocessing import Queue
from .task import Task


class LoadBalancer(object):
    def __init__(self, q: Queue):
        self.__queue = q

    def put_task_to_queue(self, task: Task):
        self.__queue.put(task)
