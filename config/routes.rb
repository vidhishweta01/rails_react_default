Rails.application.routes.draw do
  root to: 'home#landing'
  get '/sweet_home', to: 'home#sweet_home', as: 'sweet_home_path'
end
