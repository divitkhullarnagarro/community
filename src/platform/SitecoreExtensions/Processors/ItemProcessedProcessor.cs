using Nest;
using Newtonsoft.Json.Linq;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Publishing.Pipelines.Publish;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CommunityAccelerator.SitecoreExtensions.Processors
{
    public class ItemProcessedProcessor : PublishProcessor
    {
        public override void Process(PublishContext context)
        {
            Console.WriteLine("Inside Publish Processor");
            Log.Info("Inside Publish Processor", "Elastic Search");
            //Assert.ArgumentNotNull(context, "context");
            //if (!context.Aborted)
            //{
            //    IEnumerable<Item> processedItems = from i in context.ProcessedPublishingCandidates.Keys
            //                                       select context.PublishOptions.TargetDatabase.GetItem(i.ItemId) into j
            //                                       where j != null
            //                                       select j;
            //    ConcurrentQueue<PublishingCandidate> deletedItems = context.DeleteCandidates;
            //    var items = new JObject[processedItems.Count()];
            //    var settings1 = new ConnectionSettings(new Uri("https://localhost:9200")).CertificateFingerprint("72cc190c34d3905e699426619cf5dfb9ef0878b6474ccd65a7d728c635633fde").BasicAuthentication("accelerator", "test@123");
            //    var client1 = new ElasticClient(settings1);
            //    BulkDescriptor descriptor = new BulkDescriptor();

            //    foreach (var item in processedItems)
            //    {
            //        var myType = new MyType
            //        {
            //            Values =
            //                      {
            //                          { "Name", item.Name },
            //                          { "DisplayName", item.DisplayName },
            //                          { "Path", item.Paths.FullPath },
            //                          { "UpdatedDate", item.Statistics.Updated.ToString("yyyy-MM-dd'T'HH:mm:ss") },
            //                      }
            //        };
            //        foreach (Sitecore.Data.Fields.Field field in item.Fields)
            //        {
            //            if (!field.Key.Contains("rendering") && !field.Key.StartsWith("_") && !string.IsNullOrEmpty(field.Value))
            //                myType.Values.Add(field.Key, field.Value);
            //        }
            //        //dynamic obj = new JObject();
            //        //item.Fields.ReadAll();
            //        //obj["Name"] = item.Name;
            //        //obj["DisplayName"] = item.DisplayName;
            //        ////obj.Id = item.ID.ToShortID().ToString();
            //        //obj.Path = item.Paths.FullPath;
            //        //obj["Language"] = item.Language.ToString();
            //        //obj.UpdatedDate = item.Statistics.Updated.ToString();
            //        //foreach (Sitecore.Data.Fields.Field field in item.Fields)
            //        //{
            //        //    if (!field.Key.Contains("rendering") && !field.Key.StartsWith("_") && !string.IsNullOrEmpty(field.Value))
            //        //        obj[field.Key] = field.Value;
            //        //}
            //        ////var response = IndexDocument(client1, obj);
            //        ////var result = response.Result;
            //        descriptor.Index<Dictionary<string, object>>(i => i
            //            .Index("sitecore_elastic_web").Id(item.ID.ToShortID().ToString())
            //            .Document(myType.Values));
            //        //items[k++] = obj;
            //    }
            //    var response = IndexManyDocument(client1, descriptor);
            //}
        }

        private bool IndexManyDocument(ElasticClient client1, BulkDescriptor descriptor)
        {
            //var response = await client1.BulkAsync(b => b.Index("sitecore_elastic_web").IndexMany<object>(itemObject));


            var response = client1.Bulk(descriptor);
            if (response.IsValid)
            {
                Console.WriteLine($"Index document with ID {string.Join(",", response.Items.Select(x => x.Id))} succeeded.");
                return true;
            }
            return false;
        }
        private async Task<bool> IndexDocument(ElasticClient client1, dynamic itemObject)
        {
            var response = await client1.BulkAsync(b => b.Index("sitecore_elastic_web").Index<object>(itemObject));


            if (response.IsValid)
            {
                Console.WriteLine($"Index document with ID {string.Join(",", response.Items.Select(x => x.Id))} succeeded.");
                return true;
            }
            return false;
        }
    }
    public class MyType
    {
        public MyType()
        {
            Values = new Dictionary<string, object>();
        }

        public Dictionary<string, object> Values { get; private set; }
    }
}