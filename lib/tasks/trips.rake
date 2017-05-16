namespace :trips do
  desc 'Atualiza dados calculados das viagens.'
  task update: :environment do
    Trip.update_calculated_info
  end
end
