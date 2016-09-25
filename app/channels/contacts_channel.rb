class ContactsChannel < ApplicationCable::Channel
  def subscribed
    if params[:id]
      stream_from "contacts_#{params[:id]}"
    else
      stream_from "contacts"
    end
  end
end
