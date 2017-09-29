class UserTokenController < Knock::AuthTokenController
  def create
    entity.update(last_sign_in_at: DateTime.now, last_sign_in_ip: request.remote_ip)
    super
  end
end
