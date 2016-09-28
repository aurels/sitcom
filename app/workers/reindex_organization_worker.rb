class ReindexOrganizationWorker

  include Sidekiq::Worker

  def perform(id, action = 'update', contact_ids = [])
    organization = Organization.find(id)

    if action == 'update'
      organization.__elasticsearch__.index_document
      organization.contacts.import
    else
      organization.__elasticsearch__.delete_document
      Contact.where(:id => contact_ids).import
    end
  end

end
