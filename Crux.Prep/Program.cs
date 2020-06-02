using System;

namespace Crux.Prep
{
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Press (r) to rebuild - (c) to clean - (i) to insert test data");
            Console.WriteLine("Set to modify data on " + TestDataSetup.Urls[0] + " for database " +
                              TestDataSetup.Database);
            Console.WriteLine("");
            var key = Console.ReadKey();

            if (key.KeyChar.ToString() == "c")
            {
                Clean();
            }

            if (key.KeyChar.ToString() == "r")
            {
                Rebuild();
            }

            if (key.KeyChar.ToString() == "i")
            {
                Insert();
            }

            Console.WriteLine("");
            Console.WriteLine("Press a key to finish");
            Console.ReadKey();
        }

        private static void Clean()
        {
            TestDataSetup.Clean();
        }

        private static void Rebuild()
        {
            TestDataSetup.Clean();
            TestDataSetup.Build();
        }

        private static void Insert()
        {
            TestDataSetup.Build();
        }
    }
}