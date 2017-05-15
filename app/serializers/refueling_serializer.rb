# == Schema Information
#
# Table name: refuelings
#
#  created_at  :datetime         not null
#  date        :datetime         not null
#  id          :integer          not null, primary key
#  liter_price :decimal(5, 3)
#  liters      :decimal(5, 3)
#  odometer    :decimal(5, 1)
#  total_cost  :decimal(7, 3)
#  updated_at  :datetime         not null
#  vehicle_id  :integer          not null
#
# Indexes
#
#  index_refuelings_on_vehicle_id  (vehicle_id)
#

class RefuelingSerializer < ActiveModel::Serializer
  attributes :id, :vehicle_id, :date, :liter_price, :liters, :total_cost, :odometer, :economy, :km_cost, :tracked_distance
end
