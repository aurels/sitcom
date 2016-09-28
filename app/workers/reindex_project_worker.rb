class ReindexProjectWorker

  include Sidekiq::Worker

  def perform(id, action = 'update', contact_ids = [])
    project = Project.find(id)

    if action == 'update'
      project.__elasticsearch__.index_document
      project.contacts.import
    else
      project.__elasticsearch__.delete_document
      Contact.where(:id => contact_ids).import
    end
  end

end
