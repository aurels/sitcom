class Lab < ApplicationRecord

  # Associations

  has_many :lab_user_links, :dependent => :destroy
  has_many :users, :through => :lab_user_links

  has_many :contacts,      :dependent => :destroy
  has_many :organizations, :dependent => :destroy
  has_many :projects,      :dependent => :destroy
  has_many :events,        :dependent => :destroy

  has_many :saved_searches, :dependent => :destroy

  has_many :tags, :dependent => :destroy

  has_many :custom_fields, :dependent => :destroy

  # Validations

  validates :name, :presence   => { :message => "Le nom est obligatoire."  },
                   :uniqueness => { :message => "Ce nom est déjà utilisé." }

  # Callbacks

  before_save do
    self.slug = name.parameterize
  end

  # Methods

  def to_param
    slug
  end

  def custom_fields_as_json(item_type)
    custom_fields.where(:item_type => item_type).collect do |custom_field|
      {
        :id         => custom_field.id,
        :name       => custom_field.name,
        :field_type => custom_field.field_type,
        :options    => custom_field.options
      }
    end
  end

end
