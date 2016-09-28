class ReindexEventWorker

  include Sidekiq::Worker

  def perform(id, action = 'update', contact_ids = [])
    event = Event.find(id)

    if action == 'update'
      event.__elasticsearch__.index_document
      event.contacts.import
    else
      event.__elasticsearch__.delete_document
      Contact.where(:id => contact_ids).import
    end
  end

end
