class ApplicationController < ActionController::Base

  # Filters

  before_action :authenticate_user!
  #before_action :http_basic_auth

  # Forgery Protection
  # https://github.com/plataformatec/devise/pull/4033/files

  protect_from_forgery with: :exception, prepend: true


  # Methods

  protected

  def render_404
    raise ActionController::RoutingError.new('Not Found')
  end

  def set_flash_now_errors(object)
    if object.errors.any?
      flash.now[:alert] = object.errors.messages.values.join('<br />').html_safe
    end
  end

  def http_basic_auth
    if Rails.env.production? && ENV['HTTP_BASIC_AUTH_USERNAME'].present?
      authenticate_or_request_with_http_basic do |username, password|
        username == ENV['HTTP_BASIC_AUTH_USERNAME'] &&
        password == ENV['HTTP_BASIC_AUTH_PASSWORD']
      end
    end
  end
end
