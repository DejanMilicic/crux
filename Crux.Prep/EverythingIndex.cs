namespace Crux.Prep
{
    using Raven.Client.Documents.Indexes;

    public class EverythingIndex : AbstractIndexCreationTask
    {
        public override IndexDefinition CreateIndexDefinition()
        {
            return new IndexDefinition
            {
                Name = "EverythingIndex",
                Maps = {"from doc in docs let DocId = doc[\"@metadata\"][\"@id\"] select new {DocId};"}
            };
        }
    }
}