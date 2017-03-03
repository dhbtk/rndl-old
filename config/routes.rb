Rails.application.routes.draw do
  scope '/api' do
    resources :vehicles, except: [:edit]
    resources :trips, only: [:index, :show, :destroy]
    get '/upload', to: 'entries#create'
  end
  root to: 'home#show'
  %w(/vehicles /trips /dates).each do |segment|
    get segment, to: 'home#show'
    get segment + '/:a', to: 'home#show'
  end
end
