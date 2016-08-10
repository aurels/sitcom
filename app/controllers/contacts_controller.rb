class ContactsController < ApplicationController
  def index
    respond_to do |format|
      format.html

      format.json do
        contacts = ContactSearch.new(params.merge({
          :lab_id => current_lab.id
        })).run

        render :json => {
          :contacts => contacts
        }
      end
    end
  end
end
