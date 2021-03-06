class CustomFieldsController < ApplicationController

  before_action :find_lab
  before_action :find_item
  before_action :find_custom_field

  def update
    @custom_field_link = @item.custom_field_links.where({
      :custom_field_id => @custom_field.id
    }).first_or_initialize

    @custom_field_link.assign_attributes(strong_params)
    @custom_field_link.save!

    @item.__elasticsearch__.index_document
    @item.cable_update

    render :status => 200, body: nil
  end

  private

  def strong_params
    params.require(:custom_field).permit(
      :text_value, :bool_value
    )
  end

  def find_lab
    @lab = current_user.labs.find_by_slug!(params[:lab_id])
  end

  def find_item
    if params[:contact_id]
      @item = @lab.contacts.find(params[:contact_id])
    else
      raise "unsupported item type"
    end
  end

  def find_custom_field
    @custom_field = @lab.custom_fields.find(params[:id])
  end

end
