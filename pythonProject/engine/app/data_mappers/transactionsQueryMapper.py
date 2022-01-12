
class TransactionQueryMapper:

    @staticmethod
    def map_transaction_user_array(query_array, senderOrReceiver):
        retval = []
        for x in query_array:
            email = x.sender.email if senderOrReceiver else x.receiver.email
            name = x.sender.name if senderOrReceiver else x.receiver.name
            last_name = x.sender.last_name if senderOrReceiver else x.receiver.last_name
            retval.append(
                {
                    "id": x.id,
                    "email": email,
                    "amount": x.amount,
                    "timestamp": str(x.datetime),
                    "name": name,
                    "lastName": last_name,
                })

        return retval
