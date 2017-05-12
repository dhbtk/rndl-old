class Page
  attr_accessor :total_pages, :total_count, :page, :content
  include ActiveModel::Serialization
  def initialize(relation)
    @total_pages = relation.total_pages
    @total_count = relation.total_count
    @page = relation.current_page
    @content = relation
  end
end