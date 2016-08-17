class OrganizationsController < ApplicationController
  before_action :find_lab

  def index
    respond_to do |format|
      format.json do
        organizations = OrganizationSearch.new(params.merge({
          :lab_id => @lab.id
        })).run

        render :json => {
          :organizations => organizations
        }
      end

      format.html
    end
  end

  def show
    respond_to do |format|
      format.json do
        @organization = @lab.organizations.find(params[:id])
      end

      format.html do
        render 'index'
      end
    end
  end

  def create
    respond_to do |format|
      format.json do
        @organization = @lab.organizations.new(strong_params)

        if @organization.save
          render_json_success
        else
          render_json_errors(@organization)
        end
      end
    end
  end

  def update
    respond_to do |format|
      format.json do
        @organization = @lab.organizations.find(params[:id])

        if @organization.update_attributes(strong_params)
          render_json_success
        else
          render_json_errors(@organization)
        end
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        @organization = @lab.organizations.find(params[:id])

        if @organization.destroy
          render_json_success
        else
          render_json_errors(@organization)
        end
      end
    end
  end

  protected

  def strong_params
    params.require(:organization).permit(
      :name, :status, :description, :website_url,
      :contact_ids => []
    )
  end

  private

  def find_lab
    @lab = current_user.labs.find_by_slug!(params[:lab_id])
    save_lab_in_cookies(@lab)
  end
end