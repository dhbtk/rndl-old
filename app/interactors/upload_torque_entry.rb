class UploadTorqueEntry
  include Interactor::Organizer

  organize InsertEntry, SendRealTimeVehiclePosition, UpdateTrip
end
