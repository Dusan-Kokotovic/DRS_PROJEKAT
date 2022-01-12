from threading import Thread
from multiprocessing import Queue


class Worker(Thread):
    def __init__(self, q: Queue):
        Thread.__init__(self)

        self.__queue = q

    def run(self):
        while True:
            task = self.__queue.get()
            self.__do_task(task)

    def __do_task(self, task):
        print(task)
