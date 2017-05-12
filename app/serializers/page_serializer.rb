class PageSerializer < ActiveModel::Serializer
  attributes :total_pages, :total_count, :page

  has_many :content, serializer: RefuelingSerializer # FIXME!!!
end