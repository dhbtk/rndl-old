source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.0'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.18'
gem 'activerecord-postgis-adapter', '~> 4.0.0'
# Use Puma as the app server
gem 'puma', '~> 3.7'
gem 'active_model_serializers', '~> 0.10.0'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 3.0'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.2'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem 'annotate'

gem 'devise_token_auth'

gem "interactor-rails", "~> 2.0"
gem 'kaminari'
gem 'whenever', require: false