module ContactIndexConcern
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks

    index_name "sitcom-#{Rails.env}-contacts"

    settings CommonIndexConcern::SETTINGS_HASH do
      mappings do
        indexes :id,     :index => 'not_analyzed'
        indexes :lab_id, :index => 'not_analyzed'
        indexes :name
        indexes :active, :index => 'not_analyzed'
        indexes :email
        indexes :phone
        indexes :address
        indexes :organization_ids, :index => 'not_analyzed'
        indexes :field_ids,        :index => 'not_analyzed'
        indexes :projects_ids,     :index => 'not_analyzed'
        indexes :events_ids,       :index => 'not_analyzed'

        indexes :sort_name, :analyzer => :sortable_string_analyzer
      end
    end
  end

  def as_indexed_json(options = {})
    {
      :id               => id,
      :lab_id           => lab_id,
      :active           => active,
      :email            => email,
      :phone            => phone,

      :twitter_url  => twitter_url,
      :linkedin_url => linkedin_url,
      :facebook_url => facebook_url,
      :website_url  => website_url,
      :picture_url  => picture_url,

      :name         => name,
      :address      => address,
      :address_html => address(true),

      :organization_ids => organization_ids,
      :organizations    => organizations_as_indexed_json,

      :field_ids => field_ids,
      :fields    => fields_as_indexed_json,

      :event_ids => event_ids,
      :events    => events_as_indexed_json,

      :project_ids => project_ids,
      :projects    => projects_as_indexed_json,

      :sort_name => name
    }
  end

  def organizations_as_indexed_json
    organizations.collect do |organization|
      {
        :id   => organization.id,
        :name => organization.name
      }
    end
  end

  def fields_as_indexed_json
    fields.collect do |field|
      {
        :id        => field.id,
        :parent_id => field.parent_id,
        :name      => field.name
      }
    end
  end

  def events_as_indexed_json
    events.collect do |event|
      {
        :id   => event.id,
        :name => event.name
      }
    end
  end

  def projects_as_indexed_json
    projects.collect do |project|
      {
        :id   => project.id,
        :name => project.name
      }
    end
  end
end