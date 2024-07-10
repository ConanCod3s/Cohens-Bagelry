import firebase_admin
from firebase_admin import credentials, firestore
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Initialize Firebase Admin
cred = credentials.Certificate('path/to/your/serviceAccountKey.json')
firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()

# SendGrid API Key
SENDGRID_API_KEY = 'YOUR_SENDGRID_API_KEY'
sg = SendGridAPIClient(SENDGRID_API_KEY)

# Firestore trigger on new document in 'orders' collection
def send_order_email(event, context):
    order_id = context.resource.split('/')[-1]
    order_ref = db.collection('orders').document(order_id)
    order_data = order_ref.get().to_dict()

    msg = Mail(
        from_email='your-email@example.com',
        to_emails=order_data['email'],
        subject='Order Confirmation',
        plain_text_content=f'Thank you for your order, {order_data["firstName"]}!',
        html_content=f'<strong>Thank you for your order, {order_data["firstName"]}!</strong>'
    )

    try:
        response = sg.send(msg)
        print(f'Order confirmation email sent: {response.status_code}')
    except Exception as e:
        print(f'Error sending email: {e}')

# Firestore document creation trigger
from google.cloud import firestore
def firestore_document_created(event, context):
    if event['value']['name'].endswith('orders'):
        send_order_email(event, context)
