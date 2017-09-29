Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  scope '/api' do
    resources :vehicles, except: [:edit]
    resources :trips, only: [:index, :show, :destroy]
    resources :landmarks, except: [:edit]
    resources :refuelings, except: [:edit]
    get '/upload', to: 'entries#create'
  end
  root to: 'home#show'
  %w(/vehicles /trips /dates /landmarks /login).each do |segment|
    get segment, to: 'home#show'
    get segment + '/:a', to: 'home#show'
  end
end
