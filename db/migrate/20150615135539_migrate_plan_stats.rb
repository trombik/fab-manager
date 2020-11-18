# frozen_string_literal:true

class MigratePlanStats < ActiveRecord::Migration[4.2]
  def up
    index = StatisticIndex.where(es_type_key: 'subscription').first
    return unless index

    StatisticType.where(statistic_index_id: index.id).destroy_all
    Plan.all.each(&:create_statistic_type)
  end

  def down
    index = StatisticIndex.where(es_type_key: 'subscription').first
    return unless index

    StatisticType.where(statistic_index_id: index.id).destroy_all

    StatisticType.create!(statistic_index_id: index.id, key: 'month', label: 'Abonnements mensuels', graph: true, simple: true)
    StatisticType.create!(statistic_index_id: index.id, key: 'year', label: 'Abonnements annuels', graph: true, simple: true)
  end
end
