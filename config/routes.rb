Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks]
  scope '/api' do
    resources :vehicles, except: [:edit]
    resources :trips, only: [:index, :show, :destroy]
    resources :landmarks, except: [:edit]
    get '/upload', to: 'entries#create'
  end
  root to: 'home#show'
  %w(/vehicles /trips /dates /landmarks /login).each do |segment|
    get segment, to: 'home#show'
    get segment + '/:a', to: 'home#show'
  end
end
